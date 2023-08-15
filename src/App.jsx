import { Field, Form, Formik } from "formik"

export const App = () => {
  return (
    <div className="">
      <header className="flex w-full justify-center p-5 shadow-lg relative z-10">
        <Formik
          initialValues={{search : ''}}
          onSubmit={async values => 
            // aqui se va a llamar a la API de unsplash
            console.log(values)}
        >
          <Form className="flex w-full">
            <Field name="search" 
            className="flex w-full justify-center items-center text-center outline-none cursor-pointer text-[40px]"  
            autoComplete="off"
            placeholder="Type here ⌨" />
          </Form>
        </Formik>
      </header>
    </div>
  )
}
