import React, { useContext, useState } from 'react'
import { Button,Modal,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { ICategory } from '../../interface/category.interface';
import MenuBar from '../MenuBar';

function HomeCategory(props: any) {
	
	const {categories, setCategories} = useContext(props.categoriesContext);	

	let history = useNavigate()

	return (
		<div style={{margin:'10rem'}}>
			<MenuBar/>
			<Link className="d-grid gap-2" to='/categories/create'>
				<Button variant="warning" size="lg">Adicionar Categoria</Button>
			</Link> 
			<Table striped bordered hover size="sm" className='mt-3'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((item: ICategory, index: number) => {
						return(
							<tr key={index}>
								<td>{item.id}</td>
								<td>{item.name}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</div>
		
	)
}

export default HomeCategory
