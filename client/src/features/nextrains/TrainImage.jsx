import { Buffer } from "buffer";

function TrainImage({route}) {
  const imgBase64String = Buffer.from(String.fromCharCode(...new Uint8Array(route.img.data.data)), 'utf-8').toString('base64');
  return (<>
    <img src={`data:image/svg+xml;base64,${imgBase64String}`} alt={route.route}/>
  </>);
}
export default TrainImage;