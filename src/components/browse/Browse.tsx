import Link from "next/link";

function Browse() {
  return (
    <div className="bg1 rounded-[1.12rem] mx-4 px-6 lg:rounded-[2.5rem] lg:mx-24 mb-[3.13rem] lg:mb-20 pb-[1.69rem] lg:pb-[4.75rem]">
      <h1 className="font1 text-center pt-10 pb-8 text-[2rem] font-bold tracking-wider lg:text-5xl lg:pt-[4.37rem] lg:pb-16 ">BROWSE BY DRESS STYLE</h1>
      <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-5 lg:gap-5 lg:mx-16">
          
          <div className="lg:col-span-2 relative">
            <Link href="/style/casual">
              <img className="rounded-[1.25rem] w-full h-[11.87rem] lg:w-full lg:h-[18.06rem]" src="https://i.postimg.cc/mk1FFWh9/casual1.png" alt="" />
              <h3 className="absolute top-4 left-6 text-2xl font-bold lg:text-[2.25rem] lg:top-[1.56rem] lg:left-[2.25rem]">Casual</h3>
            </Link>
          </div>
          
         <div className="lg:col-span-3 relative">
          <Link href="/style/formal">
            <img className="rounded-[1.25rem] w-full h-[11.87rem] lg:w-full lg:h-[18.06rem]" src="https://i.postimg.cc/t4gTwHNH/formal1.png" alt="" />
            <h3 className="absolute top-4 left-6 text-2xl font-bold lg:text-[2.25rem] lg:top-[1.56rem] lg:left-[2.25rem]">Formal</h3>
          </Link>     
         </div>

        <div className="lg:col-span-3 relative">
          <Link href="/style/party">
            <img className="rounded-[1.25rem] w-full h-[11.87rem] lg:w-full lg:h-[18.06rem]" src="https://i.postimg.cc/7PgfT9Zj/party1.png" alt="" />
            <h3 className="absolute top-4 left-6 text-2xl font-bold lg:text-[2.25rem] lg:top-[1.56rem] lg:left-[2.25rem]">Party</h3>
          </Link>
        </div>

        <div className="lg:col-span-2 relative">
          <Link href="/style/gym">
            <img className="rounded-[1.25rem] w-full h-[11.87rem] lg:w-full lg:h-[18.06rem]" src=" https://i.postimg.cc/gkWLM57Y/gym1.png" alt="" />
            <h3 className="absolute top-4 left-6 text-2xl font-bold lg:text-[2.25rem] lg:top-[1.56rem] lg:left-[2.25rem]">Gym</h3>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Browse;




// https://i.postimg.cc/kgLQxtG2/casual.png
// https://i.postimg.cc/Hx9bDZ2M/formal.png
// https://i.postimg.cc/wTZgH63X/gym.png
// https://i.postimg.cc/NGXWT10H/party.png



// https://i.postimg.cc/mk1FFWh9/casual1.png
// https://i.postimg.cc/t4gTwHNH/formal1.png
// https://i.postimg.cc/gkWLM57Y/gym1.png
// https://i.postimg.cc/7PgfT9Zj/party1.png
