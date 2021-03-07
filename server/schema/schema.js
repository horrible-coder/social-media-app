const graphql = require("graphql");
const User = require("../models/User");
const Card = require("../models/Card");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    fullName: { type: GraphQLString },
    profilePicUrl: { type: GraphQLString },
    cardsUploaded: { type: new GraphQLList(GraphQLString) },
    likedCards: { type: new GraphQLList(GraphQLString) },
    favCards: { type: new GraphQLList(GraphQLString) },
    sharedCards: { type: new GraphQLList(GraphQLString) },
  }),
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    id: { type: GraphQLID },
    imageUrl: { type: GraphQLString },
    text: { type: GraphQLString },
    likes: { type: GraphQLInt },
    favs: { type: GraphQLInt },
    shares: { type: GraphQLInt },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: async (parent, args) => await User.findById(parent.userId),
    },
    createdAt: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve: async (parent, args) =>
        await User.findOne({ username: args.username }),
    },
    card: {
      type: CardType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => await Card.findById(args.id),
    },
    cards: {
      type: new GraphQLList(CardType),
      resolve: async (parent, args) =>
        await Card.find({}).sort({ createdAt: "desc" }),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        fullName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let user = new User({
          username: args.username,
          password: args.password,
          fullName: args.fullName,
        });
        const newUser = await user.save();
        return newUser;
      },
    },
    loginUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) =>
        await User.findOne({
          username: args.username,
          password: args.password,
        }),
    },
    addCard: {
      type: CardType,
      args: {
        imageUrl: { type: GraphQLString },
        text: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        let card = new Card({
          imageUrl: args.imageUrl,
          userId: args.userId,
          text: args.text,
        });
        const newCard = await card.save();
        return newCard;
      },
    },
    incrementCardFavs: {
      type: CardType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) =>
        await User.findByIdAndUpdate(args.id, { $inc: { favs: 1 } }),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
