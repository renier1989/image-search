import { Field, Form, Formik } from "formik";
import { useState } from "react";

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(photos);
  return (
    <div className="">
      <header className="flex w-full justify-center p-5 shadow-lg relative z-10">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            setLoading(true);
             
              
              const response = await fetch(
                `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
                {
                  headers: {
                    Authorization:
                      "Client-ID D7KDpnlmqpYX4xC1hu7MNqf9jx7R61Fcb9kCar4ZGaM",
                  },
                }
              );

              const data = await response.json();
              setPhotos(data.results);            
            // console.log(data);
            setLoading(false);
          }}
        >
          <Form className="flex w-full">
            <Field
              name="search"
              className="flex w-full justify-center items-center text-center outline-none cursor-pointer text-[40px]"
              autoComplete="off"
              placeholder="Type here ⌨"
            />
          </Form>
        </Formik>
      </header>
      <div>
        <span>{loading ? <p>Cargando...</p> : <p>nada</p> }</span>
        <div>
          {photos.map((photo) => (
            <article key={photo.id}> 
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.desctiption, photo.alt_description].join(' ⚡ ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
