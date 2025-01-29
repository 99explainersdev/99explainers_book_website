import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="bg-red-200">
        Goto <Link href="/testData">/testData</Link>
      </h1>
    </>
  );
}
