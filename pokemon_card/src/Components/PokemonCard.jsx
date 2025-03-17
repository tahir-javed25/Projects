import "../index.css"
export const Card = ({ data, id }) => {
  return (
    <>
      <li key={id} className="pokemon-card">
        <figure>
          <img
            src={data.sprites.other.dream_world.front_default}
            alt=""
            className="pokemon-image"
          />
        </figure>
        <h1 className="pokemon-name">{data.name}</h1>
        <p className="pokemon-info pokemon-highlight">
          <span>
            {data.types.map((curtype) => curtype.type.name).join(", ")}
          </span>
        </p>
      </li>
    </>
  );
};
