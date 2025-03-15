export const Card = ({ data, id }) => {
  console.log(data);
  const { name, img_url, rating, genre, description, watch_url } = data;
  // console.log(name,rating,genre,description)

  return (
    <>
      <li key={id} className="card-content">
        <div >
          <img src={img_url} alt={name} width={"400px"} height={"400px"} />
        </div>
        <div>
          <h2>Name: {name}</h2>
          <p> <strong>Summary:</strong> {description}</p>
          <h3>Genre: {genre}</h3>
          <h3>Rating: {rating}</h3>
        </div>
        <div>
          <a href={watch_url}>
            <button className="btn">Watch Now</button>
          </a>
        </div>
      </li>
    </>
  );
};
