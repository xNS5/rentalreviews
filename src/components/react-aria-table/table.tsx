"use client"

import {Cell, Column, Row, Table as TableComp, TableBody, TableHeader} from 'react-aria-components';

export default function Table(){
    return (

        <TableComp aria-label="Files" selectionMode="multiple">
          <TableHeader>
            <Column isRowHeader>Name</Column>
            <Column isRowHeader>Type</Column>
            <Column isRowHeader>Date Modified</Column>
          </TableHeader>
          <TableBody>
            <Row>
              <Cell>Games</Cell>
              <Cell>File folder</Cell>
              <Cell>6/7/2020</Cell>
            </Row>
            <Row>
              <Cell>Program Files</Cell>
              <Cell>File folder</Cell>
              <Cell>4/7/2021</Cell>
            </Row>
            <Row>
              <Cell>bootmgr</Cell>
              <Cell>System file</Cell>
              <Cell>11/20/2010</Cell>
            </Row>
            <Row>
              <Cell>log.txt</Cell>
              <Cell>Text Document</Cell>
              <Cell>1/18/2016</Cell>
            </Row>
          </TableBody>
        </TableComp>)
}