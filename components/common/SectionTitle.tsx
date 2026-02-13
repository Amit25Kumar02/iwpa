type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <div className="section-title">
      <h1>{title}</h1>
    </div>
  );
}
