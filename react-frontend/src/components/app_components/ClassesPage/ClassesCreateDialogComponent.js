import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ClassesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            classId: _entity?.classId,className: _entity?.className,roomNumber: _entity?.roomNumber,teacherId: _entity?.teacherId,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("classes").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Classes created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Classes" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Classes" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="classes-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="classId">Class ID:</label>
                <InputNumber id="classId" className="w-full mb-3 p-inputtext-sm" value={_entity?.classId} onChange={(e) => setValByKey("classId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["classId"]) ? (
              <p className="m-0" key="error-classId">
                {error["classId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="className">Class Name:</label>
                <InputText id="className" className="w-full mb-3 p-inputtext-sm" value={_entity?.className} onChange={(e) => setValByKey("className", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["className"]) ? (
              <p className="m-0" key="error-className">
                {error["className"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="roomNumber">Room Number:</label>
                <InputNumber id="roomNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.roomNumber} onChange={(e) => setValByKey("roomNumber", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["roomNumber"]) ? (
              <p className="m-0" key="error-roomNumber">
                {error["roomNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="teacherId">Teacher ID:</label>
                <InputNumber id="teacherId" className="w-full mb-3 p-inputtext-sm" value={_entity?.teacherId} onChange={(e) => setValByKey("teacherId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["teacherId"]) ? (
              <p className="m-0" key="error-teacherId">
                {error["teacherId"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ClassesCreateDialogComponent);