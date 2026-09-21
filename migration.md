Upgrade this app to Next.js 16.

Before editing code, make sure AGENTS.md points at version-matched Next.js docs. If it is missing or outdated, follow [Set up AI agent docs](/docs/app/guides/upgrading/version-16#set-up-ai-agent-docs), then read AGENTS.md.

Then follow the [Next.js 16 upgrade guide](/docs/app/guides/upgrading/version-16) as the source of truth for the migration. Use the [codemod](/docs/app/guides/upgrading/version-16#using-the-codemod) when you're ready to run the mechanical upgrade.

Briefly explain the upgrade plan in user-facing language before making broad changes.
Follow the documented defaults and keep moving unless the guide requires a project-specific decision, the change is destructive, credentials or environment setup are missing, or the correct migration is ambiguous.
Keep the migration scoped to the upgrade, inspect the diff, run the relevant checks, and fix remaining breaking changes.

After the app is upgraded, use the runtime verification flow from the [AI Coding Agents guide](/docs/app/guides/ai-agents) to confirm it still works. Prefer the `next-dev-loop` skill when it is available (Next.js 16.3 or later with Turbopack); otherwise fall back to the best available `next dev`, browser, and build checks. Open the key interactive UI states and check the Next dev indicator plus browser and server logs. Summarize what changed, what was verified, and what could not be verified.

Before finishing, repeat the post-upgrade check in [Set up AI agent docs](/docs/app/guides/upgrading/version-16#set-up-ai-agent-docs) so the project is ready for future agent work.
