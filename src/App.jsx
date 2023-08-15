import { Field, Form, Formik } from "formik";
import { useState } from "react";

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const open = url => window.open(url);
  
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
      <div className={`flex bg-[#eee] justify-center ${photos.length ? 'pb-10' : null}`}>
        {/* <span>{loading ? <p>Cargando...</p> : <p>nada</p> }</span> */}
        <div className="columns-3 w-[1200px] ">
          {photos.map((photo) => (
            <article className="inline-block mt-7 mx-7 transition-shadow ease-in-out bg-white rounded-lg hover:shadow-lg duration-500 cursor-pointer"
            key={photo.id} onClick={()=> open(photo.links.html)}> 
              <img className="w-[370px] rounded-t-lg " src={photo.urls.regular} alt={photo.alt_description} />
              <p className="px-3 py-2">{[photo.desctiption, photo.alt_description].join(' ⚡ ')}</p>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
