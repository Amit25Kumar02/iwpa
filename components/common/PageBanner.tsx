type Props = {
  title: string;
};

export default function PageBanner({ title }: Props) {
  return (
    <div className="page-banner">
      <h1>{title}</h1>
    </div>
  );
}
