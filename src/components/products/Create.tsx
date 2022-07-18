import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { ICategory } from '../../interface/category.interface';

function Create(props: any) {

	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("1");
    const {products, setProducts} = useContext(props.productsContext);
    const {categories, setCategories} = useContext(props.categoriesContext);	

	let history = useNavigate();

    const handelSubmit = async (e: any) =>{
		e.preventDefault();

        await api.post("/products",{
            "name": name, 
            "quantity": Number(quantity), 
            "is_active": true, 
            "categoryId": Number(categoryId)
        })		

        api
		.get("/products")
		.then((response) => setProducts(response.data))
        
        history('/products')
		
	}

    return (
        <div>
            <Form className="d-grid gap-2" style={{margin:'15rem'}}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Enter Name" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicQuantity">
                    <Form.Control onChange={e => setQuantity(e.target.value)} type="number" placeholder="Quantidade" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Select onChange={e => setCategoryId(e.target.value)} required>
                        {categories.length >=1 &&
                            categories.map((item: ICategory, index: number) => {
                                return (
                                    <option value={item.id} key={index}>{item.name}</option>
                                )
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Button
                    onClick={e => handelSubmit(e)}
                        variant="primary" type="submit">
                        Adicionar
                </Button>
                <Link className="d-grid gap-2" to='/'>
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export default Create
