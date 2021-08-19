const { ApolloServer, gql } = require('apollo-server');
var _ = require('lodash')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  """
  A frontpage is the entry element in Tidy into the work of a user.
  We stripped everything not necessary for this exercise, so you only have to tille with the headlines.
  """
  type Frontpage {
    id: String!
    title: String!
    icon: String
  }

  type Query {
    """
    Delivers all active frontpages of a user sorted by their title.
    """
    frontpages: [Frontpage!]!
    """
    If you want to query an individual frontpage
    """
    frontpage(id: String!): Frontpage
    """
    Delivers all archived frontpages of a user sorted by their title 
    """
    archived: [Frontpage!]!
  }

  type Mutation {
    """
    Archives a frontpage. Subsequent calls to frontpages and archived will
    reflect this change.
    Returns true, if the frontpage could be moved. False if it is not possible.
    If false is returned, nothing in the system has changed.
    """
    archive(id: String!): Boolean!
    """
    Restores a frontpage from the archive. Subsequent calls to frontpages and archived will
    reflect this change.
    Returns true, if the frontpage could be moved. False if it is not possible.
    If false is returned, nothing in the system has changed.
    """
    restore(id: String!): Boolean!
    updateTitle(id: String!, title: String!): Frontpage!
    updateIcon(id: String!, icon: String!): Frontpage!
  }
`;


var archive = [{id: "4", title: "Pitch"}, {id: "5", title: "Branding", icon: "🌍"}];
var frontpages = [{id: "1", title: "Market Research", icon: "🔍"}, {id: "2", title: "New Features", icon: "🎉"}, {id: "3", title: "Reviews", icon: "👋"}];

const resolvers = {
  Query: {
    frontpages: () => _.sortBy(frontpages, (i) => i.title),
    archived: () => _.sortBy(archive, (i) => i.title),
    frontpage: (parent, args) => _.concat(frontpages, archive).find(f.id === args.id)
  },
  Mutation: {
    archive: (parent, args) => {
       const i = frontpages.find((e) => e.id === args.id);
       if (!i) return false;
       frontpages = frontpages.filter((e) => e.id !== args.id);
       archive.push(i);
       return true;
    },
    restore: (parent, args) => {
       const i = archive.find((e) => e.id === args.id);
       if (!i) return false;
       archive = archive.filter((e) => e.id !== args.id);
       frontpages.push(i);
       return true;
    },
    updateTitle: (parent, args) => {
       const i = _.concat(frontpages, archive).find((e) => e.id === args.id);
       i.title = args.title;
       return i;
    },
    updateIcon: (parent, args) => {
       const i = _.concat(frontpages, archive).find((e) => e.id === args.id);
       i.icon = args.icon.substring(0,1);
       return i;
   }
  }
}


const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
   console.log(`Server is ready at ${url}`);
});
