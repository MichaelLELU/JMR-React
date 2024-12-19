import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import { IngredientsResolver } from "./resolvers/IngredientsResolver";
import { RecetesResolver } from "./resolvers/RecetesResolver";

const port = 3000;

const start = async () => {
	await dataSource.initialize();

	const schema = await buildSchema({
		resolvers: [IngredientsResolver, RecetesResolver],
	});

	const apiServer = new ApolloServer({ schema });

	const { url } = await startStandaloneServer(apiServer, {
		listen: { port: port },
	});
	console.info(`🚀 Server start at ${url}`);
};
start();