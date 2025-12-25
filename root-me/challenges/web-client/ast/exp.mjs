import fs from 'fs';

class App {
    static DEBUG = false;
    static INDENT = '\x20\x20\x20\x20';
    _code = '';

    load(ast) {
        if(ast?.type === 'program') return;
        this._code = this.__loadBody(ast)
            .replace(/\[(log|map|join|fromCharCode)\]/g, '.$1');
        return this;
    }

    __loadBody(obj) {
        let code = '';
        if(!Array.isArray(obj?.body)) return code;
        for(let elem of obj.body) code += (code?'\n':'') + this.__loadBlock(elem);
        return code;
    }

    __loadBlock(obj, isDebug=false) {
        if(App.DEBUG && !isDebug) {
            return ` ::${obj?.type}::\n${this.__loadBlock(obj, true)}`;
        }
        /* Check all block */
        if(obj?.type === 'ExpressionStatement')
            return this.__loadExpressionStatement(obj) ?? '';
        if(obj?.type === 'FunctionDeclaration')
            return this.__loadFunctionDeclaration(obj) ?? '';
        if(obj?.type === 'FunctionExpression')
            return this.__loadFunctionExpression(obj) ?? '';
        if(obj?.type === 'ArrowFunctionExpression')
            return this.__loadArrowFunctionExpression(obj) ?? '';
        if(obj?.type === 'CallExpression')
            return this.__loadCallExpression(obj) ?? '';
        if(obj?.type === 'MemberExpression')
            return this.__loadMemberExpression(obj) ?? '';
        if(obj?.type === 'VariableDeclaration')
            return this.__loadVariableDeclaration(obj) ?? '';
        if(obj?.type === 'VariableDeclarator')
            return this.__loadVariableDeclarator(obj) ?? '';
        if(obj?.type === 'ArrayExpression')
            return this.__loadArrayExpression(obj) ?? '';
        if(obj?.type === 'IfStatement')
            return this.__loadIfStatement(obj) ?? '';
        if(obj?.type === 'BlockStatement')
            return this.__loadBlockStatement(obj) ?? '';
        if(obj?.type === 'ReturnStatement')
            return this.__loadReturnStatement(obj) ?? '';
        if(obj?.type === 'Identifier')
            return this.__loadIdentifier(obj) ?? '';
        if(obj?.type === 'BinaryExpression')
            return this.__loadBinaryExpression(obj) ?? '';
        if(obj?.type === 'AssignmentExpression')
            return this.__loadAssignmentExpression(obj) ?? '';
        if(obj?.type === 'Literal')
            return this.__loadLiteral(obj) ?? '';
        if(obj?.type === 'jaajajajajajajajajajajajaj')
            return '// jaajajajajajajajajajajajaj';
        console.warn(`Warn: ${obj?.type} is not implemented`);
        return '';
    }

    __loadExpressionStatement(obj) {
        return `${this.__loadBlock(obj?.expression)};`;
    }

    __loadCallExpression(obj) {
        return `${this.__loadBlock(obj?.callee)}(${
            obj?.arguments.map(elem => this.__loadBlock(elem)).join(', ')
        })`;
    }

    __loadFunctionDeclaration(obj) {
        return `function ${this.__loadBlock(obj?.id)} (${
            obj?.params.map(elem => this.__loadBlock(elem)).join(', ')
        }) ${this.__loadBlock(obj?.body)}`;
    }

    __loadFunctionExpression(obj) {
        return `(function (${
            obj?.params.map(elem => this.__loadBlock(elem)).join(', ')
        }) ${this.__loadBlock(obj?.body)})`;
    }

    __loadArrowFunctionExpression(obj) {
        return `((${
            obj?.params.map(elem => this.__loadBlock(elem)).join(', ')
        }) => ${this.__loadBlock(obj?.body)})`;
    }

    __loadMemberExpression(obj) {
        return `${this.__loadBlock(obj?.object)}[${this.__loadBlock(obj?.property)}]`;
    }

    __loadVariableDeclaration(obj) {
        return `${obj?.kind} ${obj?.declarations.map(
            elem => this.__loadBlock(elem)
        ).join(', ')}`;
    }

    __loadVariableDeclarator(obj) {
        return `${this.__loadBlock(obj?.id)} = ${this.__loadBlock(obj?.init)};`;
    }

    __loadArrayExpression(obj) {
        if(obj?.elements.length > 3) {
            return `[\n${this.__indent(
                obj?.elements.map(elem => this.__loadBlock(elem))
                    .reduce((accum, out) => {
                        accum.out += (accum.out?', ':'')+(accum.out&&!accum.nb?'\n':'')+out;
                        accum.nb = (accum.nb + 1) % 4;
                        return accum;
                    }, { out: '', nb: 0 }).out
            )}\n]`;
        } else {
            return `[${obj?.elements.map(elem => this.__loadBlock(elem)).join(', ')}]`;
        }
    }

    __loadBlockStatement(obj) {
        return `{\n${
            this.__indent(this.__loadBody(obj))
        }\n}`
    }

    __loadIfStatement(obj) {
        return `if(${this.__loadBlock(obj?.test)}) ${
            this.__loadBlock(obj?.consequent)}`;
    }

    __loadBinaryExpression(obj) {
        return `(${this.__loadBlock(obj?.left)}) ${obj.operator} ${
            this.__loadBlock(obj?.right)}`
    }

    __loadAssignmentExpression(obj) {
        return `${this.__loadBlock(obj?.left)} ${obj?.operator} ${
            this.__loadBlock(obj?.right)}`;
    }

    __loadLiteral(obj) {
        return obj?.raw;
    }

    __loadIdentifier(obj) {
        return `${obj?.name}`;
    }

    __loadReturnStatement(obj) {
        return `return ${this.__loadBlock(obj?.argument)};`;
    }

    __indent(code) {
        return code.replace(/(^|\n)/g, `$1${App.INDENT}`)
    }

    getCode() {
        return this._code;
    }
}

// load the source code
const ast = JSON.parse(fs.readFileSync('source-ast-ch38.json', 'utf-8'))
const app = new App();
app.load(ast);

// Running
console.log(`----- CODE -----\n${app.getCode()}\n\n----- EVAL -----`);
eval(app.getCode());

