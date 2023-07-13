import { db } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(404).end();
      //   throw new Error("Invalid ID");
    }

    if (req.method == "GET") {
      const { filterOption, id } = req.query;
      const viewsData = await getPageViewsByDuration(id, filterOption);

      return res.status(200).json(viewsData);
    } else if (req.method == "POST") {
      await db.pageView.create({
        data: {
          userId: id,
          timestamp: new Date(),
        },
      });

      return res.status(200).json({ msg: "Visit tracked" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

async function getPageViewsByDuration(userId, period) {
  const currentDate = new Date();
  const startDate = new Date();

  if (period === "1hr") {
    startDate.setHours(currentDate.getHours() - 1);
  } else if (period === "7d") {
    startDate.setDate(currentDate.getDate() - 7);
  } else if (period === "30d") {
    startDate.setMonth(currentDate.getMonth() - 1);
  }

  const pageViews = await db.pageView.findMany({
    where: {
      userId: userId,
      timestamp: {
        gte: startDate,
        lt: currentDate,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  return transformDataForBarGraph(pageViews, period);
}

function transformDataForBarGraph(pageViews, period) {
  const data = [];

  const aggregation = {
    "1hr": {
      // Aggregate by hour
      format: "yyyy-MM-dd HH:00",
      step: 60 * 60 * 1000, // 1 hour in milliseconds
      previousCount: 2,
      nextCount: 2,
    },
    "7d": {
      // Aggregate by day
      format: "yyyy-MM-dd",
      step: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      previousCount: 6, // 6 previous days to make it total 7 days
      nextCount: 0, // No next days as it covers the range till today
    },
    "30d": {
      // Aggregate by day
      format: "yyyy-MM-dd",
      step: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      previousCount: 29, // 29 previous days to make it total 30 days
      nextCount: 0, // No next days as it covers the range till today
    },
  };

  const { format, step, previousCount, nextCount } = aggregation[period];

  const currentDate = new Date();

  // Calculate the start date based on the period
  const startDate = new Date(
    currentDate.getTime() - (previousCount + nextCount + 1) * step
  );

  // Generate x-values for the previous days
  for (let i = previousCount; i >= 0; i--) {
    const timestamp = new Date(startDate.getTime() + step * i);
    const x = formatDate(timestamp, format);
    data.push({ x, y: 0 });
  }

  // Aggregate the actual data points
  for (const pageView of pageViews) {
    const timestamp = new Date(pageView.timestamp);
    const x = formatDate(timestamp, format);

    const existingData = data.find(item => item.x === x);
    if (existingData) {
      existingData.y++;
    } else {
      data.push({ x, y: 1 });
    }
  }

  // Sort the data array by x-values in ascending order
  data.sort((a, b) => new Date(a.x) - new Date(b.x));

  return data;
}

function formatDate(date, format) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes);
}
