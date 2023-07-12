import { Plus } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import AddLinkModal from "../../shared/modals/add-new-link";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "./link";
import Loader from "@/components/utils/loading-spinner";
import useCurrentUser from "@/hooks/useCurrentUser";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import useLinks from "@/hooks/useLinks";

const LinksEditor = () => {
	const { data: currentUser } = useCurrentUser();
	const userId = currentUser?.id ? currentUser.id : null;

	const { data: userLinks, isLoading } = useLinks(userId);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const activeIndex = userLinks.findIndex((link) => link.id === active.id);
			const overIndex = userLinks.findIndex((link) => link.id === over.id);
			const newLinks = arrayMove(userLinks, activeIndex, overIndex);
			// Add update link order logic here
		}
	};

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToVerticalAxis]}>
			<div className="max-w-[640px] mx-auto my-10">
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div className="">
							<button
								className="bg-slate-900 w-full font-medium flex justify-center gap-1 
                items-center h-12 px-8 rounded-3xl text-white hover:bg-slate-700">
								<Plus /> Add link
							</button>
						</div>
					</Dialog.Trigger>
					<AddLinkModal />
				</Dialog.Root>

				<div className="my-10 mx-4">
					{!isLoading ? (
						userLinks?.map(({ id, ...userLink }) => (
							<>
								<motion.div
									key={id}
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.5 }}>
									<SortableContext
										items={userLinks && userLinks}
										strategy={verticalListSortingStrategy}>
										<Link key={id} id={id} {...userLink} />
									</SortableContext>
								</motion.div>
							</>
						))
					) : (
						<Loader
							bgColor="black"
							textColor="text-slate-700"
							message={"Fetching links..."}
						/>
					)}
					{!isLoading && userLinks?.length === 0 && (
						<div className="mt-4 w-[245px] h-auto flex flex-col mx-auto">
							<Image
								className="object-cover"
								width="220"
								height="220"
								alt="not-found"
								src="/assets/not-found.png"
							/>
							<h3 className="font-bold text-lg mt-3 text-[#222]">
								You don&apos;t have any links yet
							</h3>
							<p className="text-sm text-[#555] text-center px-3">
								Please click on the button above to add your first
								link 🚀
							</p>
						</div>
					)}
				</div>
			</div>
		</DndContext>
	);
};

export default LinksEditor;
