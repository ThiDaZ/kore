import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "../../db";
import { profile } from "../../db/schema";

export const appRouter = router({
	// A simple query endpoint
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`,
		};
	}),

	addUser: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string(),
				role: z.enum(["Admin", "Editor", "Viewer"]),
			}),
		)
		.mutation(async ({ input }) => {
			console.log("Inserting into database:", input);

			const [userProfile] = await db
				.insert(profile)
				.values({
					email: input.email,
					name: input.name,
					role: input.role,
				})
				.returning();

			return { success: true, data: userProfile };
		}),
});

// Export the TYPE of the router.
// This is the magic that gives the frontend type-safety without importing server code!
export type AppRouter = typeof appRouter;
