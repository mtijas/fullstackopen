export default function Filter({ filter, setFilter }) {
  return (
    <>
      Find countries{" "}
      <input
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        value={filter}
      />
    </>
  );
}
