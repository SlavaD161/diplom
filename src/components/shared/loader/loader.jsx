import "./loader.css"

const Loader = () => {
    return (
        <div className="flex min-h-screen justify-center items-center absolute w-full bg-white z-[100]">
            <div className="lds-dual-ring"></div>
        </div>
    )
}

export default Loader