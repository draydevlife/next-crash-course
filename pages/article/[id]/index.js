import Meta from '../../../components/Meta'
import Link from 'next/link'
import { server } from '../../../config'

const article = ( {article} ) => {
  return (
    <>
        <Meta title={article.title} description={article.excerpt}/>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <br/>
        <Link href='/'>Go Back</Link>
    </>
  )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`${server}/posts/${context.params.id}`)
    const article = await res.json()

    return {
        props:{
            article
        }
    }
}

export const getServerSidePaths = async () => {
    const res = await fetch(`${server}/posts?_limit=6`)
    const articles = await res.json()
    const ids = articles.map((article) => article.id)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}

export default article