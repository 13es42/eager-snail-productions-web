import {Metadata} from "next";

type Props = {
    params: {
        userName: string
    }
}

// this only matters for metadata for search and you can find it in the dev tools.
// You can also see the title in the browser tab.
// export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
//     const title = await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(`User ${params.userName}`)
//         }, 100)
//     })
//     return {
//         title: `Profile: ${title}`
//     }
// }

// export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
//     const title = await new Promise((resolve) => {
//         resolve(`User ${params.userName}`)
//     })
//     return {
//         title: `Profile: ${title}`
//     }
// }



export default function featuredProfiles({ params }: Props) {
    return <h1>Details about user {params.userName}</h1>
}