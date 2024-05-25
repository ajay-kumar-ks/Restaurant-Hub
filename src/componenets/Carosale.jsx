import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRestroPostAction } from '../Redux/restro/post/restropost.action';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Carosale(item) {
    console.log("item form small view", item.item);
  
    const dispatch = useDispatch();
    const restropost = useSelector((store) => store.restropost);
  
    useEffect(() => {
      dispatch(getUsersRestroPostAction(item.item?.user?.id));
    }, [dispatch, item.item.user]);
  
    console.log("potss", restropost.posts);

    const item2 =[
      {
        img: 'https://img.freepik.com/free-vector/business-cartoon-with-key-padlock_1207-355.jpg?size=626&ext=jpg&ga=GA1.1.1344710765.1710765714&semt=ais',
        title: 'Login and Password Issues',
        more: 'if u have any issue related to login or password issues',
        Link:'',
        background:"#7bc4d3",
        
      },
      {
        img: 'https://img.freepik.com/free-vector/program-code-bug-technology-development-programming-coding-flat-isometric_126523-1939.jpg?t=st=1710767366~exp=1710770966~hmac=5a30ce24586af5340e32d0696383590f14a2f25b75d2d27a02bae8c86a85702f&w=826',
        title: 'Gets any bug or Error',
        more: 'if You find any bug or any error from a page ?',
        Link:'',
        background:"#005a87",
        
      },
      {
        img: 'https://img.freepik.com/free-vector/technology-innovation-elements_24911-45007.jpg?t=st=1710766865~exp=1710770465~hmac=d420e08a86a083ffc06982f5c38051c2c5714a029f0e30fbcb92f37cb2583673&w=740',
        title: 'Security and Privacy',
        more: 'if u have any thread or security vulnorability',
        Link:'',
        background:"#9ad2e9",
        
      },
     
      {
        img: 'https://img.freepik.com/free-vector/thief-stealing-information-from-computer_1133-41.jpg?t=st=1710767619~exp=1710771219~hmac=4be15acde001b0303306bbc06a1f328c4675d89e826b6d38d40567906024862b&w=740',
        title: 'Hacked Your Account',
        more: 'Is any one hacked your account or Theaft data',
        Link:'',
        background:"#a9cab9",
        
      },
      {
        img: 'https://img.freepik.com/free-vector/statistics-data-analysis-business-illustration_24908-59546.jpg?t=st=1710767801~exp=1710771401~hmac=593c55f4c02f7e5c07d4f66600b7d0832ef00855c76c2f0944c8a55a6a1a4c12&w=740',
        title: 'Collabe With Us',
        more: 'You can collabe with us for ads and contents',
        Link:'',
        background:"#f4b601",
      },
      {
        img: 'https://img.freepik.com/free-vector/call-center_23-2148174514.jpg?t=st=1710767950~exp=1710771550~hmac=2f1feb3d4ef0b60716eb1fe8a183d8237d9c8b51a1c1d6ee28261f5bbd815019&w=740',
        title: 'Need any Support',
        more: 'You have 24 x 7 support from our side , Chat with us',
        Link:'',
        background:"#cdeeff",
      },
      {
        img: 'https://img.freepik.com/free-vector/placeholder-concept-illustration_114360-4727.jpg?t=st=1710771843~exp=1710775443~hmac=88997769ea0af79c434317c633f3ea8a08d2e883ac6fc4008ca996f424e72339&w=996',
        title: "Did't Approved your Restaurent",
        more: 'Restaurents may be Unapporoved due to some issues.',
        Link:'',
        background:"#ffffff",
      },
      {
        img: 'https://img.freepik.com/free-vector/entrepreneurs-shaking-hands_23-2147506985.jpg?t=st=1710772842~exp=1710776442~hmac=75f8011bd4219829ba70c5d5f3e968c874c13821bd7abf2926a60cf7a232d097&w=740',
        title: 'Any issue in Restaurent TieUp',
        more: 'You can resolve the problem with our communication center',
        Link:'',
        background:"#72968a",
      },
      {
        img: 'https://img.freepik.com/free-vector/hand-drawn-shrug-illustration_23-2149318018.jpg?t=st=1710773257~exp=1710776857~hmac=a02bea1c482aba004bcfc82470c124b46245074604eb6f49f33be64050a9737f&w=740',
        title: 'Report Any problem',
        more: 'Report your Problem related to any bad content etc..',
        Link:'',
        background:"#eaeff1",
      },
     ]
  
    return (
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {item2.map((post, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={post.id}>
                {/* {console.log("inside map", post?.image)} */}
                <img src={post?.img} className="d-block w-100" alt={post?.title} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
  
  export default Carosale;
  
