/**
 * Serialize JSON-LD safely for embedding in a <script> tag (escape `<` so
 * content cannot break out of the script element).
 */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
