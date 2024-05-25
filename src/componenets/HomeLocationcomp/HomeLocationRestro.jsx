import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByCityAndAdress } from '../../Redux/restro/restro.action';
import RestaurentSmallView from '../restro/RestaurentUserView/RestaurentSmallView';



function HomeLocationRestro({item}) {

    const query = item.split(',')[0];
    item = item || '';

    const dispatch = useDispatch();
    const restro = useSelector((store) => store.restro);

    useEffect(() => {
        dispatch(getRestaurantByCityAndAdress(query));
    }, [item]);

    console.log("Restaurants:", restro.restaurents);

    return (
        <div style={{ width: '100%', display: 'grid', justifyContent: 'center' }}>
            {restro.restaurents?.map((item) => (
                <div key={item?.id}>
                    <RestaurentSmallView item={item} />
                </div>
            ))}
        </div>
    );
}

export default HomeLocationRestro;
