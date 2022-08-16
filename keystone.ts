import { config, list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { lists } from "./schema";

export default config({
  db: { provider: "sqlite", url: "file:./app.db" },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists,
});
