import fs from "fs/promises"
import path from "path"

function HomePage(props) {
  const { products } = props

  return (
    <ul>
      { products.map(product => 
        <li key={product.id}>{product.title}</li>
      ) }
    </ul>
  )
}

export async function getStaticProps() {
  console.log('re-generating')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  // cwd (current working directory) -> root folder
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  
  return {
    props: {
      products: data.products
    },
    revalidate: 30
  }
}

export default HomePage