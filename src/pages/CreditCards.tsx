import ListAllCards from "@/components/credit-card/ListAllCards";
import Heading from "@/components/typography/Heading";

export default function Card() {
  return (
    <main className="space-y-6">
      <Heading>All Cards</Heading>
      <ListAllCards />
    </main>
  );
}
