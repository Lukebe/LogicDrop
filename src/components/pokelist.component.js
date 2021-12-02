import React, { useState } from 'react';
import Axios from 'axios';
import { usePokeName, usePokeNameUpdate } from '../contexts/PokeNameContext';
import { Link } from 'react-router-dom';
import { Col, Dropdown, Form, Row, Table } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

export function PokeListComponent() {
    const pokeName = usePokeName()
    const pokeNameUpdate = usePokeNameUpdate()
    const [poke, setPoke] = useState( () => {
        return [{
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        id: 1
        }]
    })
    const [listSize, setSize] = useState( () => {return 1});
    const [listOffset, setOffset] = useState(() => { return 0 });
    const [pDisplay, setdisplay] = useState(() => updateDisplay());

    function submit() {
        fetchData();
        setdisplay(prevDisplay => updateDisplay());
    }

    async function fetchData() {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${listSize}&offset=${listOffset}`;
        Axios.get(url).then((payload) => {
            setPoke( prevPoke =>
                payload.data.results.map((p) => {
                    return(
                    {
                        name:p.name,
                        url:p.url,
                        id: p.url.slice(-3, -1).replace("/","")
                    }
                    )
                })
            )
        })
    }

    function updateLimit(e) {
        const size = e.target.value;
        setSize( prevSize => size);
    }

    function updateOffset(e) {
        const offset = e.target.value;
        setOffset(prevOffset => offset);
    }

    function sortBy(direction) {
        let pokeArr = poke;
        let intermediate = {};
        for(let i=1; i < pokeArr.length; i++){
            for (let x = 1; x < pokeArr.length; x++) {
                switch (direction) {
                    case 'A': {
                        if (pokeArr[x].name < pokeArr[x - 1].name) {
                            intermediate = pokeArr[x - 1];
                            pokeArr[x - 1] = pokeArr[x];
                            pokeArr[x] = intermediate;
                        }
                    }
                        break;
                    case 'D': {
                        if (pokeArr[x].name > pokeArr[x - 1].name) {
                            intermediate = pokeArr[x - 1];
                            pokeArr[x - 1] = pokeArr[x];
                            pokeArr[x] = intermediate;
                        }
                    }
                }
            }
        }
        setPoke(prevPoke => pokeArr);
        setdisplay(prevDisplay => updateDisplay());
    }

    async function updateSelectedName(name) {
        pokeNameUpdate(name)
    }

    function updateDisplay() {
        const display = [];
        for (let p = 0; p < poke.length; p++) {
            display.push(
                <tr key={p}>
                    <td id={p}>{poke[p].id}</td>
                    <td>{poke[p].name}</td>
                    <td>
                        <Link to='/pokepage' onClick={() => updateSelectedName(poke[p].name)}>
                            See My Page
                        </Link>
                    </td>
                    <td>
                        <a href={poke[p].url}>
                            Additional Information
                        </a>
                    </td>
                </tr>
            );
        }
        return display;
    }

    return (
        <div>
            <h1>Poke List</h1>
            <div className="d-flex flex-row">
                <div className="p-1">
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="poke-input">
                            <Form.Label  column sm="3">
                                Limit
                            </Form.Label>
                            <Col sm="6">
                            <Form.Control type="text" id="poke-limit-input" onChange={updateLimit} placeholder="1"/>
                            </Col>
                            <Col sm="3"/>
                            <Form.Label column sm="3" className="my-4">
                                Offset
                            </Form.Label>
                            <Col sm="6">
                            <Form.Control  className="my-4" type="text" id="poke-text-input" onChange={updateOffset} placeholder="0"/>
                            </Col>
                            <Col sm="3"/>
                        </Form.Group>
                        <Button variant='primary' id='submitBtn' className="md-4" onClick={() => submit()}>
                            Submit
                        </Button>
                    </Form>
                    <span/>
                    <Dropdown className="my-4">
                        <Dropdown.Toggle variant='success' id='dropdown-sort'>
                            Sort Poke List
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item id='sortA' onClick={() => sortBy('A')}>
                                Sort Ascending
                            </Dropdown.Item>
                            <Dropdown.Item id='sortD' onClick={() => sortBy('D')}>
                                Sort Decending
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="p-11">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Page</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {updateDisplay()}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default PokeListComponent;
