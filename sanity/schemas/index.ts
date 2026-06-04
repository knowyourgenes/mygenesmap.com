import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { area } from "./area";
import { decode } from "./decode";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, area, decode],
};
