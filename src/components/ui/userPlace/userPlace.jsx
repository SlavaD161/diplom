const UserPlace = ({value, setValue, placeholder, icon, type = "text"}) => {
    return (
        <label style={{outline: 0, border: 0}} className="input input-bordered w-full bg-[#ffffff] rounded-[12px] px-[30px] transition-all flex items-center gap-2">
            {
                icon
            }
            <input value={value} onChange={e => setValue(e.target.value)} type={type} className="w-full md:w-80" placeholder={placeholder} />
        </label>
    )
}

export default UserPlace