const UserDetail = ({ keyName, data }) => {

    const firstLetterToUpper = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div keyName={keyName} className="py-2">
            <span className="font-bold text-lg">{firstLetterToUpper(keyName)} :  </span>
            <input type="text" value={data} className="border" />
        </div>
    )
}

export default UserDetail;