import { useEffect, useState } from 'react'
import './App.css'
import { Vortex } from 'react-loader-spinner'
import SweetAlert2 from 'react-sweetalert2'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const url = 'https://dummyjson.com/products'

  const [swalProps, setSwalProps] = useState({});


  const getData = async () => {
    setIsLoading(true)
    await fetch(url)
      .then((response) => response.json())
      .then(setData)
      .catch((error) => setError(error))

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    // setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Ganguly',
      profession: 'Teacher | IT',
      userId: 7
    })
  }

  const postUrl = 'https://dummyjson.com/posts/add'
  const postData = async () => {
    setIsLoading(true)
    await fetch(postUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response is", data)
        alert('Data inserted successfully')

        setSwalProps({
          show: true,
          title: 'Inserted Successfully!',
          text: 'Thank you for visiting.',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes Increase",
          cancelButtonText: "Cancel",
          icon: 'success'
        })
      })
      .catch((error) => setError(error))

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    // setIsLoading(false)
  }


  console.log('#####', data)

  if (isLoading) {
    return (
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    )
  }

  if (error) {
    return (
      <h3>{error}</h3>
    )
  }

  return (
    <>

      <button onClick={postData}>POST DATA</button>

      {/* {
        // data && data?.products && data?.products[0] && data?.products[0]?.brand && 
        data && data?.products && data.products.map((item) => (
          <>
            <h1>Brand is {item?.brand}</h1>
            <h1>Availability Status {item?.availabilityStatus}</h1>
          </>
        ))
      } */}


      {
        data &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ padding: 10 }}>Limit {data?.limit}</h1>
          <h1 style={{ padding: 10 }}>Skip {data?.skip}</h1>
          <h1 style={{ padding: 10 }}>Total {data?.total}</h1>
          {/* <h1>{data.products}</h1>  */}

        </div>
      }

      {
        data && data?.products && data?.products[0] && data?.products[0].tags[0] && <h1 style={{ color: 'orange' }}>{data?.products[0].tags[0]}</h1>
      }


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>


        {
          data && data?.products && data?.products?.map((item) => (<div >
            <div style={{ width: '33%' }} key={item?.id}>
              <h2>{item?.title}</h2>
              <img src={item?.thumbnail} alt="" />

            </div>
          </div>))
        }
      </div>

      <SweetAlert2 {...swalProps} />
    </>
  )
}

export default App
