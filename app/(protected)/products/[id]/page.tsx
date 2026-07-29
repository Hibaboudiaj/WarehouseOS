import Link from "next/link";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products/${params.id}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();

  if (!res.ok) {
    return <h2>Produit introuvable.</h2>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{product.name}</h1>

        <Link href={`/products/edit/${product._id}`}>
          <Button>Modifier</Button>
        </Link>
      </div>

      <div className={styles.card}>
        <p>
          <strong>SKU :</strong> {product.sku}
        </p>

        <p>
          <strong>Description :</strong> {product.description}
        </p>

        <p>
          <strong>Catégorie :</strong> {product.category?.name}
        </p>

        <p>
          <strong>Prix :</strong> {product.price} MAD
        </p>

        <p>
          <strong>Stock :</strong> {product.quantity}
        </p>
      </div>

      <Link href="/products">
        <Button variant="secondary">
          Retour
        </Button>
      </Link>
    </div>
  );
}