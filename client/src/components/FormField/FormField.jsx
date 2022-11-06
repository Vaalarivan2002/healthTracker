import styles from "./FormField.module.css"

const FormField = ({
    type,
    placeholder,
    name,
    value,
  setter,
  dropdownValues,
}) => {
    const renderFormField = () => {
        if (["text", "password", "number"].includes(type)) {
            return (
                <>
                <div className={`${styles.materialFormField}`}>
                <input aria-required={"true"} type={type} required={true} name="text" id="field-text" className={`${styles.materialFormFieldInput}`} placeholder={placeholder} value={value[name]}
                onChange={(e) =>
                  setter({
                    key: name,
                    value: e.target.value,
                  })
                }  />
                <label className={`${styles.materialFormFieldLabel}`} htmlFor="field-text">{placeholder}</label>
              </div>


                </>
            )} else if (type === "dropdown") {
              return (
                <>
                
                  <select required={"required"}
                    value={value[name]}
                    onChange={(e) =>
                      setter({
                        key: name,
                        value: e.target.value,
                      })
                    } 
                  >
                    <option value="" disabled selected>
                      {placeholder}
                    </option>
                    {dropdownValues.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>                  
                </>
              );
            }
    }
    return <>{renderFormField()}</>;
}

export default FormField