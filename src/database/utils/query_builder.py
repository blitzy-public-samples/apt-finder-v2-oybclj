from typing import Any, List, Tuple, Union

class QueryBuilder:
    """A class for constructing SQL queries dynamically and safely."""

    def __init__(self):
        """Initializes a new QueryBuilder instance."""
        self._query: str = ""
        self._params: List[Any] = []

    def select(self, columns: Union[str, List[str]]) -> 'QueryBuilder':
        """
        Adds a SELECT clause to the query.

        Args:
            columns (Union[str, List[str]]): The column(s) to select.

        Returns:
            QueryBuilder: The QueryBuilder instance for method chaining.
        """
        # Validate input columns
        if isinstance(columns, str):
            columns = [columns]
        elif not isinstance(columns, list):
            raise ValueError("Columns must be a string or a list of strings.")

        # Append SELECT clause to _query
        self._query += f"SELECT {', '.join(columns)} "

        return self

    def from_table(self, table_name: str) -> 'QueryBuilder':
        """
        Adds a FROM clause to the query.

        Args:
            table_name (str): The name of the table.

        Returns:
            QueryBuilder: The QueryBuilder instance for method chaining.
        """
        # Validate table_name
        if not isinstance(table_name, str):
            raise ValueError("Table name must be a string.")

        # Append FROM clause to _query
        self._query += f"FROM {table_name} "

        return self

    def where(self, condition: str, params: Any) -> 'QueryBuilder':
        """
        Adds a WHERE clause to the query.

        Args:
            condition (str): The WHERE condition.
            params (Any): The parameter(s) for the condition.

        Returns:
            QueryBuilder: The QueryBuilder instance for method chaining.
        """
        # Validate condition
        if not isinstance(condition, str):
            raise ValueError("Condition must be a string.")

        # Append WHERE clause to _query
        if "WHERE" not in self._query:
            self._query += "WHERE "
        else:
            self._query += "AND "
        self._query += f"{condition} "

        # Add params to _params list
        if isinstance(params, list):
            self._params.extend(params)
        else:
            self._params.append(params)

        return self

    def order_by(self, column: str, direction: str = "ASC") -> 'QueryBuilder':
        """
        Adds an ORDER BY clause to the query.

        Args:
            column (str): The column to order by.
            direction (str): The sort direction (ASC or DESC).

        Returns:
            QueryBuilder: The QueryBuilder instance for method chaining.
        """
        # Validate column and direction
        if not isinstance(column, str):
            raise ValueError("Column must be a string.")
        if direction.upper() not in ["ASC", "DESC"]:
            raise ValueError("Direction must be either 'ASC' or 'DESC'.")

        # Append ORDER BY clause to _query
        self._query += f"ORDER BY {column} {direction.upper()} "

        return self

    def limit(self, limit_value: int) -> 'QueryBuilder':
        """
        Adds a LIMIT clause to the query.

        Args:
            limit_value (int): The limit value.

        Returns:
            QueryBuilder: The QueryBuilder instance for method chaining.
        """
        # Validate limit_value
        if not isinstance(limit_value, int) or limit_value < 1:
            raise ValueError("Limit value must be a positive integer.")

        # Append LIMIT clause to _query
        self._query += f"LIMIT %s "
        self._params.append(limit_value)

        return self

    def build(self) -> Tuple[str, List[Any]]:
        """
        Builds and returns the final SQL query and parameters.

        Returns:
            Tuple[str, List[Any]]: The SQL query string and list of parameters.
        """
        return self._query.strip(), self._params


def sanitize_input(value: Any) -> str:
    """
    Sanitizes input to prevent SQL injection.

    Args:
        value (Any): The input value to sanitize.

    Returns:
        str: Sanitized input string.
    """
    # Check if value is a string
    if isinstance(value, str):
        # If string, replace single quotes with two single quotes
        return value.replace("'", "''")
    else:
        # If not string, convert to string
        return str(value)


# Human tasks:
# TODO: Review and test the QueryBuilder class for completeness and correctness
# TODO: Implement additional query methods like JOIN, GROUP BY, HAVING if needed
# TODO: Add comprehensive unit tests for the QueryBuilder class and sanitize_input function