import styles from "./FormField.module.css"

const FormField = ({
    type,
    placeholder,
    name,
    value,
  setter,
  dropdownValues,
  heading
}) => {
    const renderFormField = () => {
        if (["text", "password", "number", "email"].includes(type)) {
            return (
                <>
                <div className={styles.form_container}>
                <p className={`${styles.heading}`}>{heading}</p>
                  
                <input aria-required={"true"} type={type} required={true} name="text" id="field-text" value={value[name]}
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
                <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
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
                  </div>               
                </>
              );
            }
    }
    return <>{renderFormField()}</>;
}

export default FormField