import React, { useContext, useState } from 'react'
import { Button,Modal,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { IProduct } from '../../interface/product.interface';
import MenuBar from '../MenuBar';

function Home(props: any) {
	
	const {products, setProducts} = useContext(props.productsContext);
	const [show, setShow] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();

	const handleClose = () => setShow(false);
	const handleShow = (id: number) => {
		setShow(true);
		setDeleteId(id);
	}
	

	let history = useNavigate()

	function setID(id: number, name: string, code: string, quantity: number, is_active: boolean, categoryId: number){
		localStorage.setItem('id', id.toString());
		localStorage.setItem('name', name);
		localStorage.setItem('code', code);
		localStorage.setItem('quantity', quantity.toString());
		localStorage.setItem('is_active', is_active.toString());
		localStorage.setItem('categoryId', categoryId.toString());
	}

	async function deleted(){
		await api
		.delete(`/products/${Number(deleteId)}`)
		handleClose()

		api
		.get("/products")
		.then((response) => setProducts(response.data))
		history('/products')
	}

	return (
		<div style={{margin:'10rem'}}>
			<MenuBar/>
			<Link className="d-grid gap-4" to='/products/create'>
				<Button variant="warning" size="lg">Adicionar Produto</Button>
			</Link>
			<Table striped bordered hover size="sm" className='mt-3'>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Quantidade</th>
						<th>Categoria</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item: IProduct, index: number) => {
						return(
							<tr key={index}>
								<td>{item.name}</td>
								<td>{item.quantity}</td>
								<td>{item.Category.name}</td>
								<td>{item.is_active ? "Ativo" : "Desativado"}</td>
								<td>
									<Link to={`/products/edit`}>
										<Button onClick={(e) => 
											setID(item.id, item.name, item.code, item.quantity, item.is_active, item.categoryId)} variant="info"
										>
											Editar
										</Button>
									</Link>
								</td>
								<td><Button onClick={e => {handleShow(Number(item.id))}}
								variant="danger">Deletar</Button></td>
							</tr>
						)
					})}
				</tbody>
			</Table>

			
			

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>Atenção</Modal.Title>
				</Modal.Header>
				<Modal.Body>Você deseja remover este produto?</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Fechar
				</Button>
				<Button variant="danger" onClick={deleted}>
					Deletar
				</Button>
				</Modal.Footer>
			</Modal>
 
		</div>
		
	)
}

export default Home
