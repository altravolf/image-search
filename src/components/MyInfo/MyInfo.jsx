import './MyInfo.scss';

function MyInfo() {
    return (
        <div className="MyInfo text-lg py-2">
            <div className="">
                Name: <b>Vivek Sehrawat</b>
            </div>
            <div className="">
                Email: <a href="mailto:viveksehrawat247@gmail.com" className="underline hover:no-underline font-bold"> viveksehrawat247@gmail.com</a>
            </div>
        </div>
    );
}

export default MyInfo;
