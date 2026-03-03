import {Client, Databases, Query, ID} from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    
    try {
        const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [Query.equal('movie_id', movie.id)])
        
        if(result.documents.length > 0) {
            const doc = result.documents[0];
            await databases.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                searchTerm: searchTerm,
                count: doc.count +1,
            })
        } else {
            await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }

    } catch (error) {
        console.log(error)
    }
}


export const getTrendingMovies = async () => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.limit(20),
            Query.orderDesc("count"),
        ]);

/*         const uniqueMovies = Object.values(
            result.documents.reduce((acc, doc) => {
                acc[doc.movie_id] = doc;
                return acc;
            }, {})
        ) */

        return result.documents;
        
    } catch (error) {
        console.log(error);
    }
}