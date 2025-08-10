import AddToCart from "@/components/addToCart/AddToCart";
import Button from "@/components/button/Button";
import ColorSelection from "@/components/colorSelection/ColorSelection";
import Comments from "@/components/comments/Comments";
import ProductRatingClient from "@/components/productRatingClient/ProductRatingClient";
import SizeSelector from "@/components/sizeSelector/SizeSelector";
import Suggest from "@/components/suggest/Suggest";
import { supabase } from "@/lib/supabaseClient";

async function Product({params}: {params:Promise<{id: string}>}) {

    const {id} = await params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return <div>Product not found</div>;
    }

  return (
    <div className="mx-4 lg:mx-24 mb-[11.56rem] lg:mb-42">
      <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>

      <div className="flex items-center gap-1 lg:gap-3">
        <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
          </svg>
        </span>
        <h3 className="text-sm font-normal opacity-60 lg:text-base">Shop</h3>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
          </svg>
        </span>
        <h3 className="text-sm font-normal opacity-60 lg:text-base">Men</h3>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
          </svg>
        </span>
        <h3 className="text-sm font-normal lg:text-base">T-shirts</h3>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:pt-[2.44rem] lg:items-center">
        <div className="lg:grid lg:grid-cols-4 lg:items-center lg:gap-[0.88rem]">
          <div className="pt-[1.41rem] mx-auto mb-3 lg:col-span-3 lg:order-2 lg:pt-0">
            <img className="rounded-[1.25rem] w-full aspect-square lg:aspect-[6/7] xl:aspect-[4/6]" src={data.image} alt="" />
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:order-1 lg:gap-[0.9rem]">
            <img className="aspect-square w-full rounded-[1.25rem] lg:aspect-[6/7] xl:aspect-[4/6]" src={data.image} alt="" />
            <img className="aspect-square w-full rounded-[1.25rem] lg:aspect-[6/7] xl:aspect-[4/6]" src={data.image} alt="" />
            <img className="aspect-square w-full rounded-[1.25rem] lg:aspect-[6/7] xl:aspect-[4/6]" src={data.image} alt="" />
          </div>
        </div>

        <div>
          <div className="mt-5">
            <h1 className="font1 tracking-wider text-2xl pb-3 font-bold leading-7 lg:text-[2.5rem] lg:pb-4">{data.title}</h1>
            <div className="flex gap-4">
              <div>
                <ProductRatingClient defaultValue={data.rate} productId={parseInt(data.id)} />
              </div>
              <div>
                <h3 className="text-sm font-normal pb-3 lg:pb-4 lg:text-base">{data.rate}/<span className="opacity-60">5</span></h3>
              </div>
            </div>
            <h1 className="text-2xl font-bold pb-[1.25rem] lg:text-[2rem]">${data.cost}</h1>
            <p className="text-sm font-normal leading-5 opacity-60 lg:text-base">{data.description}</p>
          </div>

          <div className="bg-black opacity-10 w-full h-[0.06rem] my-6"></div>

          <div>
            <ColorSelection colors={["#4F4631", "#314F4A", "#31344F"]} />
          </div>

          <div className="bg-black opacity-10 w-full h-[0.06rem] my-6"></div>

            <div>
              <SizeSelector />
            </div>

            <div className="bg-black opacity-10 w-full h-[0.06rem] my-6"></div>

            <div className="flex gap-3 mb-[3.16rem] flex-nowrap items-center">
              <Button id={parseInt(data.id)} />
              <AddToCart id={parseInt(data.id)} />
            </div>
          </div>
      </div>

      <div>
        <Comments />
      </div>
      
      <div>
        <Suggest />
      </div>
    </div>
  )
}

export default Product;
