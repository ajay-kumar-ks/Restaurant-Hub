import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBestRestro } from '../../Redux/restro/restro.action';
import RestaurentSmallView from '../restro/RestaurentUserView/RestaurentSmallView';

function HomeRestros() {
    const dispatch = useDispatch();
    const restro = useSelector((store) => store.restro);

    useEffect(() => {
        dispatch(getBestRestro());
    }, [dispatch]);

    console.log("Restaurants:", restro.restaurents);

    return (
        <div style={{ width: '100%', display: 'grid', justifyContent: 'center' }}>
            {restro.restaurents?.map((item) => (
                <div key={item.id}>
                    <RestaurentSmallView item={item} />
                </div>
            ))}
        </div>
    );
}

export default HomeRestros;
