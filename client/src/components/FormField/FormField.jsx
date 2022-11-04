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
                {/* <div className={`${styles.formField}`}>
            <input
              type={type}
              placeholder={placeholder}
              value={value[name]}
              onChange={(e) =>
                setter({
                  key: name,
                  value: e.target.value,
                })
              }
            />
          </div> */}


                </>
            )} else if (type === "dropdown") {
              return (
                <>
                {/* <div className={`${styles.materialFormField}`}>
    <input type={type} required name="dropDown" id="field-dropDown"
    placeholder={placeholder}
    value={value[name]}
    onChange={(e) =>
      setter({  
        key: name,
        value: e.target.value,
      })
    }
    className={`${styles.materialFormFieldInput}`}
    />
    <label className={`${styles.materialFormFieldLabel}`}for="field-dropDown">Drop down</label>
    
    <ul className={`${styles.materialDropdown}`}>
      <li className={`${styles.materialDropdownLi}`}>Item 1</li>
      <li className={`${styles.materialDropdownLi}`}>Item 2</li>
      <li className={`${styles.materialDropdownLi}`}>Item 3</li>
      <li>Item 4</li>
      <li>Item 5</li>
      <li>Item 6</li>
    </ul>
  </div> */}
                  {/* <div className={`${styles.formField} ${styles.selectDiv}`}> */}
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
                  {/* </div> */}
                  
                </>
              );
            }
        
    }
    return <>{renderFormField()}</>;
}

export default FormField