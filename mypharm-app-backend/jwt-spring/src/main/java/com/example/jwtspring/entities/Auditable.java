package com.example.jwtspring.entities;

import java.util.Date;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public abstract class Auditable {

	/*
	 * @CreatedBy protected U createdBy;
	 */

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdat;

	/*
	 * @LastModifiedBy protected U lastModifiedBy;
	 */

	/*
	 * @LastModifiedDate
	 * 
	 * @Temporal(TIMESTAMP) protected Date lastModifiedDate;
	 */
    
    // getters and setter here
}
