import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { ICategory } from '../../interface/category.interface';

function CreateCategory(props: any) {

    const [name, setName] = useState("");
    const {categories, setCategories} = useContext(props.categoriesContext);

	let history = useNavigate();

    const handelSubmit = async (e: any) =>{
		e.preventDefault();

        await api.post("/categories",{
            "name": name 
        })		

        api
		.get("/categories")
		.then((response) => setCategories(response.data))
        
        history('/categories')
		
	}

    return (
        <div>
            <Form className="d-grid gap-2" style={{margin:'15rem'}}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Enter Name" required/>
                </Form.Group>

                <Button
                    onClick={e => handelSubmit(e)}
                        variant="primary" type="submit">
                        Adicionar Categoria
                </Button>
                <Link className="d-grid gap-2" to='/categories'>
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export default CreateCategory
