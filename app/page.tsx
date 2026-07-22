import Button from "@/components/Button/Button";
import FormField from "@/components/FormField/FormField";
import AuthCard from "@/components/AuthCard/AuthCard";

export default function Home() {
  return (
    <div>
      <Button>Se Connecter</Button>
      <FormField label="Adresse email" name="email" type="email"/>
      <AuthCard />
    </div>
  );
}
