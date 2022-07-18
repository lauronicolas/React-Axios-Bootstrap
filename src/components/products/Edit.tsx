import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../axios';
import { Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { ICategory } from '../../interface/category.interface';


function Edit(props: any) {

	const [id, setId] = useState("")
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
	const [isActive, setIsActive] = useState("");
	const [code, setCode] = useState("");
	const {categories, setCategories} = useContext(props.categoriesContext);	
	const {products, setProducts} = useContext(props.productsContext);

	let history = useNavigate()
	
	const handelSubmit = async (e:any) =>{
		e.preventDefault();
		
		await api.patch(`/products/${id}`,{
            "name": name, 
            "quantity": Number(quantity),
			"code": code, 
            "is_active": isActive === "true" ? true : false, 
            "categoryId": Number(categoryId)
        })		
		
		api
		.get("/products")
		.then((response) => setProducts(response.data))
		
		history("/products")		
	}

	useEffect(() => {
		setId(localStorage.getItem('id')||"");
		setName(localStorage.getItem('name')||"");
		setCode(localStorage.getItem('code')||"");
		setQuantity(localStorage.getItem('quantity')||"");
		setIsActive(localStorage.getItem('is_active')||"");
		setCategoryId(localStorage.getItem('categoryId')||"");
	}, [])
		
	return (
		<div>
			<Form className="d-grid gap-2" style={{margin:'15rem'}}>

				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Control value={name}
								onChange={e => setName(e.target.value)}
								type="text" placeholder="Enter Name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicQuantity">
					<Form.Control value={quantity}
								onChange={e => setQuantity(e.target.value)}
								type="text" placeholder="0" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicActive">
                    <Form.Select value={isActive.toString()	} onChange={e => setIsActive(e.target.value)} required>
                        <option value="true" key="1">Ativo</option>
						<option value="false" key="2">Desativado</option>
                    </Form.Select>
                </Form.Group>

				<Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Select onChange={e => setCategoryId(e.target.value)} value={categoryId} required>
                        {
                            categories.map((item: ICategory, index: number) => {
                                return (
                                    <option 
										value={item.id} 
										key={index}
									>
										{item.name}
									</option>
                                )
                            })
                        }
                    </Form.Select>
                </Form.Group>
				
				<Button
					onClick={e => handelSubmit(e)}
					variant="primary" type="submit" size="lg">
						Atualizar
				</Button>

				<Link className="d-grid gap-2" to='/products'>
					<Button variant="warning" size="lg">Home</Button>
				</Link>
			</Form>
		</div>
	)
}

export default Edit
