import Button from "@/components/Button/Button";
import FormField from "@/components/FormField/FormField";

export default function Home() {
  return (
    <div>
      <Button>Se Connecter</Button>
      <FormField label="Adresse email" name="email" type="email"/>
    </div>
  );
}
