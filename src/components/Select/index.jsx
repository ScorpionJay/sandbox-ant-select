import React, { useState } from "react";
import { Select as AntSelect, Input } from "antd";
import "antd/lib/select/style/index.css";
import "antd/lib/input/style/index.css";
const Option = AntSelect.Option;

function Select(props) {
  const [options, setOptions] = useState(props.options);
  const [value, setValue] = useState(props.value);
  const [inputValue, setInputValue] = useState("");
  const [scrollPage, setScrollPage] = useState(1);

  const [dropdown_open, setDropdownOpen] = useState(false);
  const [onBlur_disable, setOnBlurDisable] = useState(false);

  function fnSelect(value) {
    setValue(value);
    setOptions(props.options);
    setInputValue("");
  }

  function fnInputChange(e) {
    setInputValue(e.target.value);
    const opts = props.options.filter(item => item.includes(e.target.value));
    setOptions(opts);
  }

  /**
   * TODO 需要优化
   * @param {*} e
   */
  function fnPopupScroll(e) {
    e.preventDefault();
    console.log(
      e.target.scrollTop,
      e.target.offsetHeight,
      e.target.scrollHeight
    );
    if (props.options.length > scrollPage * 10) {
      if (
        e.target.scrollTop + e.target.offsetHeight >=
        e.target.scrollHeight - 10
      ) {
        setScrollPage(scrollPage + 1);
      }
    }
  }

  return (
    <AntSelect
      value={value}
      style={{ minWidth: 200 }}
      placeholder="请选择"
      onSelect={fnSelect}
      open={dropdown_open}
      onPopupScroll={fnPopupScroll}
      onDropdownVisibleChange={open => {
        if (!onBlur_disable) {
          setDropdownOpen(open);
        }
      }}
      dropdownRender={menu => {
        return (
          <div>
            <div
              style={{ display: "flex", alignItems: "center" }}
              onMouseEnter={() => setOnBlurDisable(true)}
              onMouseLeave={() => setOnBlurDisable(false)}
            >
              <Input
                style={{ minWidth: 190 }}
                value={inputValue}
                onChange={fnInputChange}
              />
            </div>

            {menu}
          </div>
        );
      }}
    >
      {options.slice(0, scrollPage * 10).map(item => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </AntSelect>
  );
}

export default Select;
