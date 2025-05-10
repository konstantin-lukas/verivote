import type { z } from "zod";

import type { BaseVoteCreateSchema } from "@/schemas/vote";

export type Vote = z.infer<typeof BaseVoteCreateSchema>;
