import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVlogByIdAction } from '../../Redux/vlogs/vlog.action';
import VlogDetailed from './VlogDetailed';
import { useParams } from 'react-router-dom';

function VlogDetailed2() {
    const { id } = useParams();
    const dispatch=useDispatch();

    const vlog=useSelector(store=>store.vlog);
  

    useEffect(() => {
        if (id) {
          dispatch(getVlogByIdAction(id));
        }
      }, [dispatch, id, vlog.newComment]);

      console.log("vlogs to pass",vlog.vlog)

  return (
    <div>
      <VlogDetailed item={vlog?.vlog}/>
    </div>
  )
}

export default VlogDetailed2
